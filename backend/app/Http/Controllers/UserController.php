<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function index()
    {
        // Logica voor het ophalen van gebruikers, indien nodig
    }

    public function store(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|max:12|confirmed',
            'password_confirmation' => 'required|string|min:8|max:12',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

      
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

     
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User succesvol aangemaakt!',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        // Validatie van het verzoek
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8|max:12',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Zoek de gebruiker op basis van het e-mailadres
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email of wachtwoord is onjuist.'
            ], 401); 
        }

        // Controleer of het wachtwoord correct is
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email of wachtwoord is onjuist.'
            ], 401); 
        }

        // Genereer een JWT-token voor de gebruiker
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Login succesvol!',
            'user' => $user->makeHidden(['password']), // Verberg wachtwoord in response
            'token' => $token
        ], 200);
    }
    
    public function userDashboard(Request $request)
    {
        try {
            // Verifieer het token en haal de gebruiker op
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenInvalidException $e) {
            return response()->json(['errors' => 'Token is ongeldig'], 401);
        } catch (TokenExpiredException $e) {
            return response()->json(['errors' => 'Token is vervald'], 401);
        } catch (JWTException $e) {
            return response()->json(['errors' => 'Token niet gevonden'], 401);
        }

        return response()->json([
            'user' => $user,
            'message' => 'Welkom in je dashboard!',
        ], 200);
    }

public function logout(Request $request)
{
    try {
        $token = JWTAuth::getToken();

        if (!$token) {
            return response()->json(['error' => 'Token is vervald'], 401);
        }

        JWTAuth::invalidate($token);

        return response()->json(['message' => 'Logout succesvol'], 200);

    } catch (TokenInvalidException $e) {
        return response()->json(['error' => 'Token is ongeldig'], 401);
    } catch (TokenExpiredException $e) {
        return response()->json(['error' => 'Token is vervald'], 401);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Er is iets mis gegaan'], 500);
    }
}

}
