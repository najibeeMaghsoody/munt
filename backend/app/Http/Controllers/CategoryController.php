<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{// Haal alle categorieën op van de ingelogde gebruiker
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $categories = Categories::where('user_id', $userId)
            ->with('file') // Zorg dat de relatie bestaat in je model
            ->get();

        return response()->json($categories);
    }

    // Toon één specifieke categorie
    public function show(Request $request, Categories $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($category);
    }

    // Sla een nieuwe categorie op
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'file_id' => 'nullable|exists:files,id',
        ]);

        $category = Categories::create([
            'name' => $validated['name'],
            'file_id' => $validated['file_id'] ?? null,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($category, 201);
    }

    // Update een bestaande categorie
    public function update(Request $request, Categories $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'file_id' => 'nullable|exists:files,id',
        ]);

        $category->update($validated);

        return response()->json($category);
    }

    // Verwijder een categorie
    public function destroy(Request $request, Categories $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
