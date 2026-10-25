import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/families');
    };

    return (
        <>
            <Head title="Ajouter une famille" />

            <div
                style={{
                    padding: '40px',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
            >
                <h1>Ajouter une famille</h1>

                <form onSubmit={submit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Nom de la famille</label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ex: Tablettes"
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

                    <Link href="/products/create">Annuler</Link>
                </form>
            </div>
        </>
    );
}
