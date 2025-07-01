<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    // Haal alle categorieën op van de ingelogde gebruiker
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $categories = Categories::where('user_id', $userId)
            ->with('file') 
            ->get();

        return response()->json($categories);
    }

  
    public function show(Request $request, Categories $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($category);
    }

    // Sla een nieuwe categorie op
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'file_id' => 'nullable|exists:files,id',
    //     ]);

    //     $category = Categories::create([
    //         'name' => $validated['name'],
    //         'file_id' => $validated['file_id'] ?? null,
    //         'user_id' => $request->user()->id,
    //     ]);

    //     return response()->json($category, 201);
    // }
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'file_id' => 'nullable|integer|exists:files,id',
    ]);

    $user = $request->user();

    // Alleen checken of de gebruiker zelf deze categorie al heeft
    $exists = Categories::where('user_id', $user->id)
        ->where('name', $request->name)
        ->exists();

    if ($exists) {
        return response()->json([
            'message' => 'Je hebt deze categorie al aangemaakt.',
        ], 409); 
    }

    $category = Categories::create([
        'name' => $request->name,
        'file_id' => $request->file_id,
        'user_id' => $user->id,
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
        'file' => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
    ]);

    // Bestandsupload verwerken als aanwezig
    if ($request->hasFile('file')) {
        $uploadedFile = $request->file('file');
        $fileName = uniqid() . '.' . $uploadedFile->getClientOriginalExtension();
        $path = $uploadedFile->storeAs('public/icons', $fileName);

        // Opslaan in files-tabel
        $fileModel = File::create([
            'name' => $fileName,
            'extension' => $uploadedFile->getClientOriginalExtension(), 
            'size' => $uploadedFile->getSize(),
            'user_id' => $request->user()->id, 
        ]);

        // Verbind nieuwe file_id met de categorie
        $category->file_id = $fileModel->id;
    }

    if (isset($validated['name'])) {
        $category->name = $validated['name'];
    }

    $category->save();

    return response()->json($category->load('file'));
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
