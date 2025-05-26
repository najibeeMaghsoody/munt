<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        try {
            $transactions = Transactions::where('user_id', $request->user()->id)
                ->with('category')
                ->orderByDesc('date')
                ->get();

            return response()->json($transactions);
        } catch (Exception $e) {
            return response()->json(['error' => 'Kon transacties niet ophalen.'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'category_id' => 'required|exists:categories,id',
                'amount' => 'required|numeric',
                'description' => 'nullable|string',
                'type' => 'required|in:income,expense',
                'date' => 'required|date',
            ]);

            $transaction = Transactions::create([
                'user_id' => $request->user()->id,
                'category_id' => $validated['category_id'],
                'amount' => $validated['amount'],
                'description' => $validated['description'] ?? null,
                'type' => $validated['type'],
                'date' => $validated['date'],
            ]);

            return response()->json($transaction, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Transactie aanmaken mislukt.'], 500);
        }
    }

    public function update(Request $request, Transactions $transaction)
    {
        try {
            if ($transaction->user_id !== $request->user()->id) {
                return response()->json(['error' => 'Geen toegang tot deze transactie.'], 403);
            }

            $validated = $request->validate([
                'category_id' => 'sometimes|exists:categories,id',
                'amount' => 'sometimes|numeric',
                'description' => 'nullable|string',
                'type' => 'sometimes|in:income,expense',
                'date' => 'sometimes|date',
            ]);

            $transaction->update($validated);

            return response()->json($transaction);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Transactie bijwerken mislukt.'], 500);
        }
    }

    public function destroy(Request $request, Transactions $transaction)
    {
        try {
            if ($transaction->user_id !== $request->user()->id) {
                return response()->json(['error' => 'Geen toegang tot deze transactie.'], 403);
            }

            $transaction->delete();

            return response()->json(['message' => 'Transactie succesvol verwijderd.']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Verwijderen mislukt.'], 500);
        }
    }
}