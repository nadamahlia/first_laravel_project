<?php

namespace App\Http\Controllers;

use App\Models\Family;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('family')->get();
        $families = Family::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'families' => $families,
        ]);
    }

    public function create()
    {
        $families = Family::all();

        return Inertia::render('Products/Create', [
            'families' => $families,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'family_id' => 'required|exists:families,id',
            'image_link' => 'nullable|string',
        ]);

        Product::create($validated);

        return redirect()->route('products.index');
    }

    public function edit(Product $product)
    {
        $families = Family::all();

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'families' => $families,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'family_id' => 'required|exists:families,id',
            'image_link' => 'nullable|string',
        ]);

        $product->update($validated);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
