import { Head, Link, useForm } from '@inertiajs/react';

interface Family {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    family_id: number;
    image_link: string | null;
}

interface Props {
    product: Product;
    families: Family[];
}

export default function Edit({ product, families }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        family_id: String(product.family_id),
        image_link: product.image_link ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/products/${product.id}`);
    };

    return (
        <>
            <Head title="Modifier un produit" />

            <div
                style={{
                    padding: '40px',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <h1>Modifier le produit</h1>

                <form onSubmit={submit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Nom du produit</label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                            }}
                        />

                        {errors.name && (
                            <div style={{ color: 'red' }}>{errors.name}</div>
                        )}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>Famille</label>

                        <select
                            value={data.family_id}
                            onChange={(e) =>
                                setData('family_id', e.target.value)
                            }
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                            }}
                        >
                            <option value="">-- Choisir une famille --</option>

                            {families.map((family) => (
                                <option key={family.id} value={family.id}>
                                    {family.name}
                                </option>
                            ))}
                        </select>

                        {errors.family_id && (
                            <div style={{ color: 'red' }}>
                                {errors.family_id}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label>Lien de l'image</label>

                        <input
                            type="text"
                            value={data.image_link}
                            onChange={(e) =>
                                setData('image_link', e.target.value)
                            }
                            placeholder="https://..."
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                            }}
                        />

                        {errors.image_link && (
                            <div style={{ color: 'red' }}>
                                {errors.image_link}
                            </div>
                        )}
                    </div>

                    {data.image_link && (
                        <div style={{ marginBottom: '20px' }}>
                            <p>Aperçu :</p>

                            <img
                                src={data.image_link}
                                alt={data.name}
                                width="200"
                                style={{
                                    borderRadius: '8px',
                                }}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            padding: '10px 20px',
                            marginRight: '10px',
                        }}
                    >
                        {processing ? 'Modification...' : 'Modifier'}
                    </button>

                    <Link href="/products">Annuler</Link>
                </form>
            </div>
        </>
    );
}
