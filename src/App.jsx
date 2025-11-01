import { useState, useCallback } from 'react';
import LogUploader from './components/LogUploader';
import LogTable from './components/LogTable';
import SearchBar from './components/SearchBar';

const KNOWN_PORTS = {
  22: "SSH", 80: "HTTP", 179: "BGP", 443: "HTTPS/AWS-API", 445: "SMB/FSx",
  500: "VPN-IKE", 988: "FSx-Lustre", 1433: "SQL-Server", 1521: "Oracle",
  2049: "NFS/EFS", 2181: "Zookeeper/Kafka", 2376: "etcd", 2379: "etcd", 2380: "etcd",
  3000: "Grafana", 3306: "MySQL/Aurora", 3389: "RDP", 4500: "VPN-IPSec",
  5432: "PostgreSQL/Aurora", 5439: "Redshift", 5900: "VNC", 6379: "Redis/ElastiCache",
  6443: "Kubernetes-API", 8000: "DynamoDB-Local", 9090: "Prometheus", 9092: "Kafka/MSK",
  9094: "Kafka", 9100: "Node-Exporter", 9120: "Prometheus-Exporter", 9153: "CoreDNS",
  10250: "Kubelet", 10255: "Kubelet-RO", 11211: "Memcached", 25888: "CloudWatch-Agent",
  51678: "ECS-Agent"
}

function App() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const parseLogFile = (content) => {
    const lines = content.split('\n').filter(line => line.trim());
    const parsed = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].trim().split(/\s+/);
      if (parts.length >= 14) {
        const dstport = parseInt(parts[6]);
        parsed.push({
          version: parts[0],
          accountId: parts[1],
          interfaceId: parts[2],
          srcaddr: parts[3],
          dstaddr: parts[4],
          srcport: parts[5],
          dstport: parts[6],
          protocol: parts[7],
          packets: parts[8],
          bytes: parts[9],
          start: parts[10],
          end: parts[11],
          action: parts[12],
          logStatus: parts[13],
          service: KNOWN_PORTS[dstport] || 'Unknown'
        });
      }
    }
    setLogs(parsed);
    setFilteredLogs(parsed);
  };

  const handleSearch = useCallback((searchTerm) => {
    if (!searchTerm) {
      setFilteredLogs(logs);
      return;
    }
    const filtered = logs.filter(log => log.srcaddr.startsWith(searchTerm));
    setFilteredLogs(filtered);
  }, [logs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl mb-2">
            🔍 AWS Log Analyzer
          </h1>
          <p className="text-white/90 text-lg">VPC Flow Logs Analyzer</p>
        </header>
        
        <main className="max-w-7xl mx-auto space-y-6">
          <LogUploader onFileLoad={parseLogFile} />
          {logs.length > 0 && (
            <>
              <SearchBar onSearch={handleSearch} />
              <LogTable logs={filteredLogs} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
