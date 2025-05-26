<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
   
    // Categorieën ophalen
public function index(Request $request)
    {
        $categories = Categories::where('user_id', $request->user()->id)->get();
        return response()->json($categories);
    }

    // Nieuwe categorie aanmaken
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048',
        ]);

        $path = null;

        if ($request->hasFile('icon_path')) {
            $path = $request->file('icon_path')->store('icons', 'public');
        }

        $category = Categories::create([
            'user_id' => $request->user()->id,
            'name' => $validated['name'],
            'icon_path' => $path,
        ]);

        return response()->json($category, 201);
    }

    // Categorie bijwerken
    public function update(Request $request, Categories $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'icon_path' => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048',
        ]);

        // Nieuwe afbeelding uploaden (oude verwijderen als er al één is)
        if ($request->hasFile('icon_path')) {
            if ($category->icon_path && Storage::disk('public')->exists($category->icon_path)) {
                Storage::disk('public')->delete($category->icon_path);
            }

            $path = $request->file('icon_path')->store('icons', 'public');
            $category->icon_path = $path;
        }

        if (isset($validated['name'])) {
            $category->name = $validated['name'];
        }

        $category->save();

        return response()->json($category);
    }

    //  Categorie verwijderen
    public function destroy(Request $request, Categories $category)
    {
        if ($category->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($category->icon_path && Storage::disk('public')->exists($category->icon_path)) {
            Storage::disk('public')->delete($category->icon_path);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}
