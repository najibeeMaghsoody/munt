<?php

namespace App\Http\Controllers;

use App\Imports\TransactionsImport;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        try {
            $transactions = Transactions::where('user_id', $request->user()->id)
               ->with('category.file')
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
                'budget_id' => 'nullable|exists:budgets,id',
                'amount' => 'required|numeric',
                'description' => 'nullable|string',
                'type' => 'required|in:income,expense',
                'date' => 'required|date',
            ]);
             $validated['user_id'] = $request->user()->id;
             $transaction = Transactions::create($validated);

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
            'budget_id' => 'nullable|exists:budgets,id',
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

    public function import(Request $request){
        try {
            $request->validate([
                'file' => 'required|file|mimes:csv,xlsx,xls|max:10240', // max 10MB
            ]);

            // Validate file content before importing
            $import = new TransactionsImport($request->user());
            
            try {
                Excel::import($import, $request->file('file'));
                return response()->json(['message' => 'Transactions successfully imported.'], 201);
            } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
                $failures = $e->failures();
                $errors = [];
                foreach ($failures as $failure) {
                    $errors[] = "Row {$failure->row()}: {$failure->errors()[0]}";
                }
                return response()->json(['error' => 'Validation failed', 'details' => $errors], 422);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Invalid file format. Please upload a valid Excel (.xlsx, .xls) or CSV file.'], 422);
        } catch (Exception $e) {
            Log::error('Import failed: ' . $e->getMessage());
            return response()->json(['error' => 'Import failed: ' . $e->getMessage()], 500);
        }
    }
}