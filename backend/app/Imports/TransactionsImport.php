<?php

namespace App\Imports;

use App\Models\Transactions;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithMapping;

class TransactionsImport implements ToModel, WithHeadingRow, WithValidation, WithMapping
{
    use Importable;

    protected $userId;

    /**
     * Constructor - zorg dat alleen het ID wordt opgeslagen
     */
    public function __construct($userId)
    {
        $this->userId = is_object($userId) ? $userId->id : $userId;
    }

    /**
     * Mapping - wordt aangeroepen vóór validatie
     */
    public function map($row): array
    {
        $date = $row['date'] ?? null;

        if ($date) {
            try {
                // Excel datum (bijv. 45264)
                if (is_numeric($date)) {
                    $date = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($date)->format('Y-m-d');
                } else {
                    // Normale string datum (bijv. "10-05-2025")
                    $date = Carbon::createFromFormat('d-m-Y', $date)->format('Y-m-d');
                }
            } catch (\Exception $e) {
                $date = null; // Laat validatie falen
            }
        }

        $row['date'] = $date;

        return $row;
    }

    /**
     * Model - wordt aangeroepen om rijen in de database te stoppen
     */
    public function model(array $row)
    {
        return new Transactions([
            'user_id'     => $this->userId,
            'category_id' => $row['category_id'],
            'budget_id'   => $row['budget_id'] ?? null,
            'amount'      => $row['amount'],
            'description' => $row['description'] ?? null,
            'type'        => strtolower($row['type']),
            'date'        => $row['date'],
        ]);
    }

    /**
     * Validatieregels voor elk veld
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:income,expense',
            'date' => 'required|date',
            'description' => 'nullable|string|max:255',
            'budget_id' => 'nullable|exists:budgets,id',
        ];
    }

    /**
     * Aangepaste foutmeldingen
     */
    public function customValidationMessages()
    {
        return [
            'category_id.required' => 'Category ID is required',
            'category_id.exists' => 'Category ID does not exist',
            'amount.required' => 'Amount is required',
            'amount.numeric' => 'Amount must be a number',
            'amount.min' => 'Amount must be greater than 0',
            'type.required' => 'Type is required',
            'type.in' => 'Type must be either income or expense',
            'date.required' => 'Date is required',
            'date.date' => 'Date must be a valid date',
            'budget_id.exists' => 'Budget ID does not exist',
        ];
    }
}
