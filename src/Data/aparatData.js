{/* Bagian Atas Kartu (Foto) */}
<div style={{ 
    position: 'relative', 
    width: '100%', 
    height: '250px', 
    backgroundColor: `#${aparat.color}`, // Warna tetap dipakai sebagai background
    overflow: 'hidden'
}}>
    {/* Fallback Inisial (muncul jika foto belum dimuat/gagal) */}
    <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        fontWeight: 'bold',
        color: 'white',
        zIndex: 0
    }}>
        {aparat.initials}
    </div>

    {/* Foto Aparat */}
    <img 
        src={aparat.photo} 
        alt={aparat.name} 
        style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Agar foto tidak gepeng
            objectPosition: 'center top', // Fokus ke wajah
            position: 'relative',
            zIndex: 1
        }} 
    />

    {/* Badge Status "Aktif" */}
    <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        backgroundColor: '#dcfce7',
        color: '#166534',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 2
    }}>
        <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></span>
        Aktif
    </div>
</div>