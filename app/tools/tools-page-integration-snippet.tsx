{/* NETFIX TOOLS — imported generators from MikroTik-Generator-main.zip */}
<section className="nt-imported-section">
  <div className="nt-section-head">
    <div><span>MIKROTIK GENERATORS</span><h2>Generator Tambahan</h2></div>
    <b>7 tools</b>
  </div>
  <div className="nt-imported-grid">
    {[
      ['BGP Script Generator','ROUTING & MIKROTIK','Generator konfigurasi dasar iBGP/eBGP.','bgp-generator.html'],
      ['PCC Load Balancing Generator','ROUTING & MIKROTIK','Generator pembagian koneksi PCC multi-WAN.','pcc-clean.html'],
      ['NTH Load Balancing Generator','ROUTING & MIKROTIK','Generator load balancing dengan metode NTH.','nth.html'],
      ['Multi-WAN Failover 4 WAN','ROUTING & MIKROTIK','Generator failover hingga empat jalur WAN.','mikrotik-failover-script-generator-4-wan.html'],
      ['Static Routing Games','ROUTING & MIKROTIK','Generator static route untuk kebutuhan routing game.','static-routing-games.html'],
      ['Auto Backup to Email','SECURITY & BACKUP','Generator script backup konfigurasi router ke email.','mikrotik-backup-to-mail-clean.html'],
      ['MikroTik Router Privacy','SECURITY & BACKUP','Generator template pengaturan informasi router.','mikrotik-hide-my-router-from-isp.html'],
    ].map(([title, category, desc, file]) => (
      <a className="nt-imported-card" key={file} href={`/PON/netfix-tools/${file}`}>
        <span>{category}</span><b>{title}</b><p>{desc}</p><strong>Buka generator →</strong>
      </a>
    ))}
  </div>
</section>
