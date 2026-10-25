import { Head, Link, useForm } from '@inertiajs/react';

interface Family {
    id: number;
    name: string;
}

interface Props {
    families: Family[];
}

export default function Create({ families }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        family_id: '',
        image_link: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/products');
    };

    return (
        <>
            <Head title="Ajouter un produit" />

            <div
                style={{
                    padding: '40px',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <h1>Ajouter un produit</h1>

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
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <label>Famille</label>

                            <Link
                                href="/families/create"
                                style={{
                                    fontSize: '14px',
                                    color: '#2563eb',
                                    textDecoration: 'none',
                                }}
                            >
                                + Ajouter une famille
                            </Link>
                        </div>

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
                        <label>Chemin de l'image</label>

                        <input
                            type="text"
                            value={data.image_link}
                            onChange={(e) =>
                                setData('image_link', e.target.value)
                            }
                            placeholder="/images/mon-image.png"
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

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            padding: '10px 20px',
                            marginRight: '10px',
                        }}
                    >
                        {processing ? 'Ajout...' : 'Ajouter'}
                    </button>

                    <Link href="/products">Annuler</Link>
                </form>
            </div>
        </>
    );
}
