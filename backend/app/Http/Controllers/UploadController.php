<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UploadController extends Controller
{
    private $saveFolder = 'icons';

    public function uploadImage(Request $request)
{
    try {
        $user = JWTAuth::parseToken()->authenticate();
        if (!$user) {
            return response()->json(['error' => 'User niet gevonden'], 401);
        }

        $request->validate([
            'image' => 'required|image|max:5120', // max 5MB
        ]);

        if (!$request->hasFile('image')) {
            return response()->json(['error' => 'Geen bestand geüpload'], 400);
        }

        $file = $request->file('image');
        $originalName = $file->getClientOriginalName();
        $fileName = pathinfo($originalName, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileSize = $file->getSize();

        // ✅ Check op duplicaat
        $existing = File::where('user_id', $user->id)
            ->where('extension', $extension)
            ->where('size', $fileSize)
            ->where('name', 'like', $fileName . '%')
            ->first();

        if ($existing) {
            return response()->json([
                'error' => 'Deze afbeelding is al geüpload.',
            ], 409);
        }

        $comPic = str_replace(' ', '_', $fileName) . '-' . rand() . '-' . time() . '.' . $extension;

        $path = $file->storeAs($this->saveFolder, $comPic, 'public');

        $newFile = File::create([
            'name' => $comPic,
            'extension' => $extension,
            'size' => $fileSize,
            'user_id' => $user->id,
        ]);

        Log::info('Bestand succesvol geüpload door user ' . $user->id . ': ' . $newFile->name);

        return response()->json([
            'message' => 'Bestand succesvol geüpload',
            'file_url' => asset('storage/' . $this->saveFolder . '/' . $newFile->name),
        ], 201);

    } catch (JWTException $e) {
        return response()->json(['error' => 'Token probleem: ' . $e->getMessage()], 401);
    } catch (\Exception $e) {
        Log::error('Fout bij upload: ' . $e->getMessage());
        return response()->json(['error' => 'Fout bij upload'], 500);
    }
}

    public function index(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'User niet gevonden'], 401);
            }

            $files = File::where('user_id', $user->id)->get();

            return response()->json(['images' => $files], 200);

        } catch (JWTException $e) {
            return response()->json(['error' => 'Token probleem: ' . $e->getMessage()], 401);
        } catch (\Exception $e) {
            Log::error('Fout bij ophalen bestanden: ' . $e->getMessage());
            return response()->json(['error' => 'Fout bij ophalen bestanden'], 500);
        }
    }
}
