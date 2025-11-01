import { useState, useEffect, useRef } from 'react';

function LogTable({ logs }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [displayCount, setDisplayCount] = useState(50);
  const observerRef = useRef();

  const sortedLogs = [...logs].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    if (sortConfig.key === 'srcport' || sortConfig.key === 'dstport' || sortConfig.key === 'bytes') {
      aVal = parseInt(aVal);
      bVal = parseInt(bVal);
    }
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const displayedLogs = sortedLogs.slice(0, displayCount);

  useEffect(() => {
    setDisplayCount(50);
  }, [logs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < sortedLogs.length) {
          setTimeout(() => {
            setDisplayCount(prev => Math.min(prev + 50, sortedLogs.length));
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [displayCount, sortedLogs.length]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Found {logs.length} Records
        </h2>
        <button
          onClick={() => {
            const header = 'version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status\n';
            const rows = logs.map(log => 
              `${log.version} ${log.accountId} ${log.interfaceId} ${log.srcaddr} ${log.dstaddr} ${log.srcport} ${log.dstport} ${log.protocol} ${log.packets} ${log.bytes} ${log.start} ${log.end} ${log.action} ${log.logStatus}`
            ).join('\n');
            const blob = new Blob([header + rows], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `filtered-logs-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          📥 Export to .txt
        </button>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th onClick={() => handleSort('srcaddr')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Source IP
              </th>
              <th onClick={() => handleSort('dstaddr')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Destination IP
              </th>
              <th onClick={() => handleSort('srcport')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Source Port
              </th>
              <th onClick={() => handleSort('dstport')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Dest Port
              </th>
              <th onClick={() => handleSort('service')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Service
              </th>
              <th onClick={() => handleSort('protocol')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Protocol
              </th>
              <th onClick={() => handleSort('action')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Action
              </th>
              <th onClick={() => handleSort('bytes')} className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors">
                Bytes
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedLogs.map((log, idx) => (
              <tr 
                key={idx} 
                className="border-b border-gray-100 hover:bg-indigo-50 transition-all duration-200 hover:scale-[1.01]"
              >
                <td className="px-6 py-4 font-mono text-sm">{log.srcaddr}</td>
                <td className="px-6 py-4 font-mono text-sm">{log.dstaddr}</td>
                <td className="px-6 py-4">{log.srcport}</td>
                <td className="px-6 py-4">{log.dstport}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {log.service}
                  </span>
                </td>
                <td className="px-6 py-4">{log.protocol}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
                    log.action === 'ACCEPT' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm">{parseInt(log.bytes).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayCount < sortedLogs.length && (
          <div ref={observerRef} className="text-center py-8">
            <div className="inline-flex items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
              <span className="text-indigo-600 font-semibold">Loading more records...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogTable;
