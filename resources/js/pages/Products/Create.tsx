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
        price: '',
        description: '',
        status: 'available',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products');
    };

    const fieldStyle = {
        display: 'block',
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        boxSizing: 'border-box' as const,
    };

    const fieldContainerStyle = {
        marginBottom: '20px',
    };

    return (
        <>
            <Head title="Déposer une annonce" />

            <div
                style={{
                    padding: '40px',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <h1>Déposer une annonce</h1>

                <p style={{ color: '#666', marginBottom: '25px' }}>
                    Présentez votre produit et indiquez son prix en dinars
                    algériens.
                </p>

                <form onSubmit={submit}>
                    <div style={fieldContainerStyle}>
                        <label htmlFor="name">Nom du produit *</label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            style={fieldStyle}
                            placeholder="Ex. Ordinateur portable"
                        />
                        {errors.name && (
                            <div style={{ color: 'red' }}>{errors.name}</div>
                        )}
                    </div>

                    <div style={fieldContainerStyle}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <label htmlFor="family_id">Famille *</label>

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
                            id="family_id"
                            value={data.family_id}
                            onChange={(e) =>
                                setData('family_id', e.target.value)
                            }
                            required
                            style={fieldStyle}
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

                    <div style={fieldContainerStyle}>
                        <label htmlFor="price">Prix (DA) *</label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            max="9999999999.99"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            required
                            style={fieldStyle}
                            placeholder="Ex. 45000"
                        />
                        {errors.price && (
                            <div style={{ color: 'red' }}>{errors.price}</div>
                        )}
                    </div>

                    <div style={fieldContainerStyle}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            maxLength={5000}
                            rows={5}
                            style={fieldStyle}
                            placeholder="Décrivez l'état du produit, ses caractéristiques..."
                        />
                        {errors.description && (
                            <div style={{ color: 'red' }}>
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div style={fieldContainerStyle}>
                        <label htmlFor="image_link">Chemin de l'image</label>
                        <input
                            id="image_link"
                            type="text"
                            value={data.image_link}
                            onChange={(e) =>
                                setData('image_link', e.target.value)
                            }
                            style={fieldStyle}
                            placeholder="/images/mon-image.png"
                        />
                        {errors.image_link && (
                            <div style={{ color: 'red' }}>
                                {errors.image_link}
                            </div>
                        )}
                    </div>

                    <div style={fieldContainerStyle}>
                        <label htmlFor="status">Statut de l'annonce</label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) =>
                                setData(
                                    'status',
                                    e.target.value as 'available' | 'sold',
                                )
                            }
                            style={fieldStyle}
                        >
                            <option value="available">Disponible</option>
                            <option value="sold">Vendu</option>
                        </select>
                        {errors.status && (
                            <div style={{ color: 'red' }}>{errors.status}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            padding: '10px 20px',
                            marginRight: '10px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        {processing ? 'Publication...' : 'Publier l’annonce'}
                    </button>

                    <Link href="/products">Annuler</Link>
                </form>
            </div>
        </>
    );
}