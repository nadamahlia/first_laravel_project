<?php

namespace Database\Seeders;

use App\Models\Family;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $smartphones = Family::create([
            'name' => 'Smartphones',
        ]);

        $laptops = Family::create([
            'name' => 'Laptops',
        ]);

        $accessories = Family::create([
            'name' => 'Accessories',
        ]);

        Product::create([
            'name' => 'iPhone 15',
            'family_id' => $smartphones->id,
            'image_link' => 'https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fistorealgeria.com%2Fproducts%2Fiphone-15-neuf-sous-emballage&ved=0CBcQjRxqFwoTCODN_uzE1JcDFQAAAAAdAAAAABA4&opi=89978449',
        ]);

        Product::create([
            'name' => 'MacBook Pro',
            'family_id' => $laptops->id,
            'image_link' => 'https://placehold.co/300x200?text=MacBook+Pro',
        ]);

        Product::create([
            'name' => 'AirPods',
            'family_id' => $accessories->id,
            'image_link' => 'https://placehold.co/300x200?text=AirPods',
        ]);
    }
}
