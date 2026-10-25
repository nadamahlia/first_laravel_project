import { Head, Link, router } from '@inertiajs/react';

interface Family {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    family_id: number;
    image_link: string | null;
    family: Family;
}

interface Props {
    products: Product[];
}

export default function Index({ products }: Props) {
    const deleteProduct = (id: number) => {
        if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
            router.delete(`/products/${id}`);
        }
    };

    return (
        <>
            <Head title="Products" />

            <div
                style={{
                    padding: '40px',
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '30px',
                    }}
                >
                    <h1>Liste des produits</h1>

                    <Link
                        href="/products/create"
                        style={{
                            padding: '10px 18px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                        }}
                    >
                        + Ajouter un produit
                    </Link>
                </div>

                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={thStyle}>Produit</th>
                            <th style={thStyle}>Famille</th>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td style={tdStyle}>{product.name}</td>

                                <td style={tdStyle}>{product.family.name}</td>

                                <td style={tdStyle}>
                                    {product.image_link ? (
                                        <img
                                            src={product.image_link}
                                            alt={product.name}
                                            width="120"
                                            height="80"
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                            }}
                                        />
                                    ) : (
                                        'Aucune image'
                                    )}
                                </td>

                                <td style={tdStyle}>
                                    <Link
                                        href={`/products/${product.id}/edit`}
                                        style={{
                                            marginRight: '10px',
                                        }}
                                    >
                                        Modifier
                                    </Link>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const thStyle = {
    textAlign: 'left' as const,
    padding: '12px',
    borderBottom: '2px solid #ddd',
};

const tdStyle = {
    padding: '15px 12px',
    borderBottom: '1px solid #ddd',
};
