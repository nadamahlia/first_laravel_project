<?php

namespace App\Http\Controllers;

use App\Models\Family;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FamilyController extends Controller
{
    public function create()
    {
        return Inertia::render('Families/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:families,name',
        ]);

        Family::create($validated);

        return redirect()->route('products.create');
    }
}
