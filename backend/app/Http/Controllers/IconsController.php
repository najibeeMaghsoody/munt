<?php

namespace App\Http\Controllers;

use App\Models\Icons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class IconsController extends Controller
{
    private $savePath = 'public/icons';    // Fysiek opslagpad in storage/app/public/icons
    private $publicPath = 'storage/icons'; // URL-pad voor frontend

    public function index()
    {
        $icons = Icons::all();
        return response()->json(['icons' => $icons], 200);
    }

    public function store(Request $request)
    {
        Log::info('Binnenkomend request:', $request->all());

        try {
            // Validatie
            $request->validate([
                'image' => 'required|image|mimes:jpg,jpeg,png,svg|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $completeFileName = $request->file('image')->getClientOriginalName();
                $fileName = pathinfo($completeFileName, PATHINFO_FILENAME);
                $extension = $request->file('image')->getClientOriginalExtension();
                $comPic = str_replace(' ', '_', $fileName) . '-' . rand() . '-' . time() . '.' . $extension;

                // ✅ Opslaan in storage/app/public/icons
                $request->file('image')->storeAs($this->savePath, $comPic);

                // ✅ Pad opslaan zoals frontend 'storage/icons/...' verwacht
                $icon = new Icons();
                $icon->name = $fileName;
                $icon->icon_path = $this->publicPath . '/' . $comPic;
                $icon->save();

                return response()->json([
                    'message' => 'Afbeelding succesvol geüpload',
                    'icon' => $icon,
                ], 201);
            }

            return response()->json(['error' => 'Geen afbeelding ontvangen'], 400);
        } catch (\Exception $e) {
            Log::error('Upload error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Upload mislukt',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, Icons $icon)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'icon_path' => 'nullable|image|mimes:png,jpg,jpeg,svg|max:2048',
        ]);

        if ($request->hasFile('icon_path')) {
            // Verwijder oud bestand
            if ($icon->icon_path && Storage::disk('public')->exists(str_replace('storage/', '', $icon->icon_path))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $icon->icon_path));
            }

            $newPath = $request->file('icon_path')->store('icons', 'public');
            $icon->icon_path = 'storage/' . $newPath;
        }

        $icon->name = $validated['name'] ?? $icon->name;
        $icon->save();

        return response()->json($icon, 200);
    }

    public function destroy(Icons $icon)
    {
        if ($icon->icon_path && Storage::disk('public')->exists(str_replace('storage/', '', $icon->icon_path))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $icon->icon_path));
        }

        $icon->delete();

        return response()->json(['message' => 'Icon succesvol verwijderd'], 200);
    }
}
