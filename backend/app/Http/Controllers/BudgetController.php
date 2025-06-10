<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    // Toon alle budgetten (optioneel filteren op gebruiker)
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $budgets = Budget::with(['user'])
                         ->where('user_id', $userId)
                         ->get();

        return response()->json($budgets);
    }

    // Budget toevoegen
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'budget' => 'required|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'recurrence' => 'nullable|in:daily,weekly,monthly,yearly',
        ]);
    
        try {
            $budget = Budget::create([
                'user_id' => $request->user()->id,
                'name' => $validated['name'],
                'budget' => $validated['budget'],
                'start_date' => $validated['start_date'] ?? null,
                'end_date' => $validated['end_date'] ?? null,
                'recurrence' => $validated['recurrence'] ?? null,
            ])->load(['user'
            ]);
    
            return response()->json($budget, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create budget: ' . $e->getMessage()], 500);
        }
    }
    
    // Budget bijwerken
    public function update(Request $request, Budget $budget)
    {

        if ($budget->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'budget' => 'sometimes|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'recurrence' => 'nullable|in:daily,weekly,monthly,yearly',
        ]);

        $budget->update($validated);

        return response()->json($budget);
    }

    // Budget verwijderen
    public function destroy(Request $request, Budget $budget)
    {
        if ($budget->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $budget->delete();

        return response()->json(['message' => 'Budget deleted successfully']);
    }
    // budget chart 
public function chart(Request $request)
{
    $userId = $request->user()->id;

    $budgets = Budget::with('transactions')->where('user_id', $userId)->get();

    return response()->json(
        $budgets->map(function ($budget) {
            $expenses = $budget->transactions->where('type', 'expense')->sum('amount');
            $income = $budget->transactions->where('type', 'income')->sum('amount');

            return [
                'id' => $budget->id,
                'name' => $budget->name,
                'total_budget' => $budget->budget,
                'total_expense' => $expenses,
                'total_income' => $income,
                'remaining' => $budget->budget - $expenses,
            ];
        })->values()
    );
}

}

