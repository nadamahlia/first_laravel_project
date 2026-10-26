<?php

namespace App\Http\Controllers;

use App\Models\Family;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
   public function index(Request $request)
{
    $query = Product::with('family');

    // Filtre par nom du produit
    $name = trim((string) $request->input('name', ''));

    if ($name !== '') {
        $query->where('name', 'ilike', "%{$name}%");
    }

    // Filtre par famille
    $familyId = $request->input('family_id');

    if ($request->filled('family_id') && is_numeric($familyId)) {
        $query->where('family_id', $familyId);
    }

    // Filtre par prix exact en DA
    $price = $request->input('price');

    if ($request->filled('price') && is_numeric($price)) {
        $query->where('price', $price);
    }

    // Filtre par statut
    $status = $request->input('status');

    if (in_array($status, ['available', 'sold'], true)) {
        $query->where('status', $status);
    }

    // Pagination : 10 produits par page
    $products = $query
        ->orderByDesc('id')
        ->paginate(15)
        ->withQueryString();

    return Inertia::render('Products/Index', [
        'products' => $products,
        'families' => Family::orderBy('name')->get(),
        'authUser' => $request->user()->only([
            'id',
            'name',
            'email',
            'role',
        ]),
        'filters' => [
            'name' => $name,
            'family_id' => $familyId ?? '',
            'price' => $price ?? '',
            'status' => $status ?? '',
        ],
    ]);
}

    public function create(Request $request)
    {
        $this->ensureCanCreate($request);

        return Inertia::render('Products/Create', [
            'families' => Family::all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->ensureCanCreate($request);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'family_id' => 'required|exists:families,id',
            'image_link' => 'nullable|string',
            'price' => 'required|numeric|min:0|max:9999999999.99',
            'description' => 'nullable|string|max:5000',
            'status' => 'required|in:available,sold',
        ]);

        $validated['user_id'] = $request->user()->id;

        Product::create($validated);

        return redirect()->route('products.index');
    }

    public function edit(Request $request, Product $product)
    {
        $this->ensureCanManage($request, $product);

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'families' => Family::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $this->ensureCanManage($request, $product);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'family_id' => 'required|exists:families,id',
            'image_link' => 'nullable|string',
              'price' => 'required|numeric|min:0|max:9999999999.99',
    'description' => 'nullable|string|max:5000',
    'status' => 'required|in:available,sold',
        ]);

        $product->update($validated);

        return redirect()->route('products.index');
    }

    public function destroy(Request $request, Product $product)
    {
        $this->ensureCanManage($request, $product);

        $product->delete();

        return redirect()->route('products.index');
    }

  private function ensureCanCreate(Request $request): void
{
    abort_unless(
        in_array($request->user()->role, ['admin', 'user'], true),
        403
    );
}

private function ensureCanManage(Request $request, Product $product): void
{
    $user = $request->user();

    abort_unless(
        $user->role === 'admin'
            || (
                $user->role === 'user'
                && (int) $product->user_id === (int) $user->id
            ),
        403
    );
}
}