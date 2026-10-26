import { Head, Link, router } from '@inertiajs/react';
import { Fragment, useState } from 'react';

interface Family {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    family_id: number;
    image_link: string | null;
    user_id: number | null;
    price: number | string | null;
    description: string | null;
    status: 'available' | 'sold';
    family: Family | null;
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

interface Props {
    products: PaginatedProducts;
    authUser: AuthUser;
}

export default function Index({ products, authUser }: Props) {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [detailsProductId, setDetailsProductId] = useState<number | null>(
        null,
    );

    const canCreate = ['admin', 'user'].includes(authUser.role);

    const canManage = (product: Product) =>
        authUser.role === 'admin' ||
        (authUser.role === 'user' && product.user_id === authUser.id);

    const formatPrice = (price: Product['price']) => {
        if (price === null || price === '') {
            return 'Prix non renseigné';
        }

        const value = Number(price);

        if (!Number.isFinite(value)) {
            return 'Prix non renseigné';
        }

        return `${new Intl.NumberFormat('fr-DZ', {
            maximumFractionDigits: 2,
        }).format(value)} DA`;
    };

    const deleteProduct = (id: number) => {
        if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
            router.delete(`/products/${id}`);
            setOpenMenuId(null);
        }
    };

    const logout = () => {
        router.post('/logout');
    };

    const fieldLabel = (status: Product['status']) =>
        status === 'sold' ? 'Vendu' : 'Disponible';

    return (
        <>
            <Head title="Catalogue des produits" />

            <main
                style={{
                    padding: '40px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                <header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        flexWrap: 'wrap',
                        marginBottom: '30px',
                    }}
                >
                    <div>
                        <h1 style={{ marginBottom: '8px' }}>
                            Catalogue des produits
                        </h1>
                        <p style={{ color: '#666', margin: 0 }}>
                            Connecté en tant que {authUser.name}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {canCreate && (
                            <Link
                                href="/products/create"
                                style={primaryButtonStyle}
                            >
                                + Déposer une annonce
                            </Link>
                        )}

                        <button
                            type="button"
                            onClick={logout}
                            style={secondaryButtonStyle}
                        >
                            Déconnexion
                        </button>
                    </div>
                </header>

                <div style={{ overflowX: 'auto' }}>
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            backgroundColor: 'white',
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={thStyle}>Produit</th>
                                <th style={thStyle}>Famille</th>
                                <th style={thStyle}>Image</th>
                                <th style={thStyle}>Prix</th>
                                <th style={thStyle}>Statut</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.data.map((product) => (
                                <Fragment key={product.id}>
                                    <tr>
                                        <td style={tdStyle}>
                                            <strong>{product.name}</strong>
                                        </td>

                                        <td style={tdStyle}>
                                            {product.family?.name ??
                                                'Sans famille'}
                                        </td>

                                        <td style={tdStyle}>
                                            {product.image_link ? (
                                                <img
                                                    src={product.image_link}
                                                    alt={product.name}
                                                    width="90"
                                                    height="65"
                                                    style={{
                                                        objectFit: 'cover',
                                                        borderRadius: '6px',
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    style={{ color: '#777' }}
                                                >
                                                    Pas de photo
                                                </span>
                                            )}
                                        </td>

                                        <td
                                            style={{
                                                ...tdStyle,
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {formatPrice(product.price)}
                                        </td>

                                        <td style={tdStyle}>
                                            <span
                                                style={{
                                                    ...statusStyle,
                                                    backgroundColor:
                                                        product.status === 'sold'
                                                            ? '#fee2e2'
                                                            : '#dcfce7',
                                                    color:
                                                        product.status === 'sold'
                                                            ? '#991b1b'
                                                            : '#166534',
                                                }}
                                            >
                                                {fieldLabel(product.status)}
                                            </span>
                                        </td>

                                        <td
                                            style={{
                                                ...tdStyle,
                                                position: 'relative',
                                            }}
                                        >
                                            <button
                                                type="button"
                                                aria-expanded={
                                                    openMenuId === product.id
                                                }
                                                onClick={() =>
                                                    setOpenMenuId(
                                                        openMenuId ===
                                                            product.id
                                                            ? null
                                                            : product.id,
                                                    )
                                                }
                                                style={secondaryButtonStyle}
                                            >
                                                ⋮ Menu
                                            </button>

                                            {openMenuId === product.id && (
                                                <div style={menuStyle}>
                                                    <button
                                                        type="button"
                                                        style={menuItemStyle}
                                                        onClick={() => {
                                                            setDetailsProductId(
                                                                detailsProductId ===
                                                                    product.id
                                                                    ? null
                                                                    : product.id,
                                                            );
                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        Afficher les détails
                                                    </button>

                                                    {canManage(product) && (
                                                        <>
                                                            <Link
                                                                href={`/products/${product.id}/edit`}
                                                                style={
                                                                    menuLinkStyle
                                                                }
                                                            >
                                                                Modifier
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                style={{
                                                                    ...menuItemStyle,
                                                                    color: '#b91c1c',
                                                                }}
                                                                onClick={() =>
                                                                    deleteProduct(
                                                                        product.id,
                                                                    )
                                                                }
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>

                                    {detailsProductId === product.id && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                style={{
                                                    ...tdStyle,
                                                    backgroundColor: '#f8fafc',
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        marginTop: 0,
                                                    }}
                                                >
                                                    Détails de l'annonce
                                                </h3>

                                                <p>
                                                    <strong>Produit :</strong>{' '}
                                                    {product.name}
                                                </p>

                                                <p>
                                                    <strong>Famille :</strong>{' '}
                                                    {product.family?.name ??
                                                        'Sans famille'}
                                                </p>

                                                <p>
                                                    <strong>Prix :</strong>{' '}
                                                    {formatPrice(product.price)}
                                                </p>

                                                <p>
                                                    <strong>Statut :</strong>{' '}
                                                    {fieldLabel(product.status)}
                                                </p>

                                                <p>
                                                    <strong>Description :</strong>
                                                </p>

                                                <p
                                                    style={{
                                                        whiteSpace: 'pre-wrap',
                                                    }}
                                                >
                                                    {product.description?.trim() ||
                                                        'Aucune description fournie.'}
                                                </p>

                                                {authUser.role === 'admin' && (
                                                    <p
                                                        style={{
                                                            color: '#666',
                                                            fontSize: '13px',
                                                        }}
                                                    >
                                                        Identifiant interne :
                                                        {' '}{product.id}
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}

                            {products.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        style={{
                                            ...tdStyle,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Aucune annonce pour le moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div
    style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginTop: '20px',
    }}
>
    <p style={{ color: '#666', fontSize: '14px' }}>
        Affichage de {products.from ?? 0} à {products.to ?? 0} sur{' '}
        {products.total} produits
    </p>

    <nav
        aria-label="Pagination"
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
        }}
    >
        {products.links.map((link, index) => {
            const label = link.label
                .replace(/&laquo;/g, '‹')
                .replace(/&raquo;/g, '›');

            const buttonStyle = {
                display: 'inline-block',
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                textDecoration: 'none',
                backgroundColor: link.active ? '#2563eb' : '#fff',
                color: link.active ? '#fff' : '#222',
                opacity: link.url ? 1 : 0.5,
            };

            return link.url ? (
                <Link
                    key={`${link.label}-${index}`}
                    href={link.url}
                    preserveScroll
                    style={buttonStyle}
                >
                    {label}
                </Link>
            ) : (
                <span
                    key={`${link.label}-${index}`}
                    style={buttonStyle}
                >
                    {label}
                </span>
            );
        })}
    </nav>
</div>
            </main>
        </>
    );
}

const thStyle = {
    textAlign: 'left' as const,
    padding: '14px 12px',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#f8fafc',
    whiteSpace: 'nowrap' as const,
};

const tdStyle = {
    padding: '15px 12px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'middle' as const,
};

const primaryButtonStyle = {
    padding: '10px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
};

const secondaryButtonStyle = {
    padding: '10px 14px',
    backgroundColor: 'white',
    color: '#222',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
};

const statusStyle = {
    padding: '5px 9px',
    borderRadius: '20px',
    fontSize: '13px',
    whiteSpace: 'nowrap' as const,
};

const menuStyle = {
    position: 'absolute' as const,
    top: '55px',
    right: '10px',
    zIndex: 10,
    minWidth: '180px',
    padding: '6px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
};

const menuItemStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    textAlign: 'left' as const,
    border: 'none',
    background: 'white',
    cursor: 'pointer',
    color: '#222',
};

const menuLinkStyle = {
    display: 'block',
    padding: '10px',
    color: '#222',
    textDecoration: 'none',
};