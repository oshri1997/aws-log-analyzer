# 🔍 AWS Log Analyzer

Advanced React application for analyzing AWS VPC Flow Logs with an intuitive user interface and advanced search capabilities.

## ✨ Key Features

- **Log File Upload** - Support for `.log` and `.txt` files with drag & drop
- **Advanced Search** - Search by source IP address with debouncing
- **Service Detection** - Automatic AWS service identification by ports
- **Dynamic Sorting** - Sort by any table column
- **Infinite Scrolling** - Gradual loading for optimal performance
- **Data Export** - Export filtered results to text file
- **Responsive Design** - Adapted for all screen sizes

## 🛠️ Technologies

- **React 19** - Advanced UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Modern CSS framework
- **ESLint** - Code quality linting

## 🚀 Installation & Setup

```bash
# Clone the project
git clone <repository-url>
cd log-analyzer-react

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production preview
npm run preview
```

## 📋 Supported Services

The application automatically identifies the following services by ports:

| Port | Service |
|------|---------|
| 22 | SSH |
| 80 | HTTP |
| 179 | BGP |
| 443 | HTTPS/AWS-API |
| 445 | SMB/FSx |
| 500 | VPN-IKE |
| 988 | FSx-Lustre |
| 1433 | SQL-Server |
| 1521 | Oracle |
| 2049 | NFS/EFS |
| 2181 | Zookeeper/Kafka |
| 2376-2380 | etcd |
| 3000 | Grafana |
| 3306 | MySQL/Aurora |
| 3389 | RDP |
| 4500 | VPN-IPSec |
| 5432 | PostgreSQL/Aurora |
| 5439 | Redshift |
| 5900 | VNC |
| 6379 | Redis/ElastiCache |
| 6443 | Kubernetes-API |
| 8000 | DynamoDB-Local |
| 9090 | Prometheus |
| 9092 | Kafka/MSK |
| 9094 | Kafka |
| 9100 | Node-Exporter |
| 9120 | Prometheus-Exporter |
| 9153 | CoreDNS |
| 10250 | Kubelet |
| 10255 | Kubelet-RO |
| 11211 | Memcached |
| 25888 | CloudWatch-Agent |
| 51678 | ECS-Agent |

## 📊 Log File Format

The application expects AWS VPC Flow Logs in standard format:

```
version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status
2 123456789012 eni-1235b8ca 172.31.16.139 172.31.16.21 20641 22 6 20 4249 1418530010 1418530070 ACCEPT OK
```

## 🎯 Usage

1. **Upload File** - Drag log file to designated area or click "Choose File"
2. **Search** - Type source IP address in search field
3. **Sort** - Click column headers to sort
4. **Export** - Click "Export to .txt" to save results

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LogUploader.jsx    # File upload component
│   ├── SearchBar.jsx      # Search bar
│   └── LogTable.jsx       # Results table
├── App.jsx                # Main component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## 🔧 Development

```bash
# Run linting
npm run lint

# Run in development mode with hot reload
npm run dev
```

## 📝 License

This project is open source and intended for educational and development purposes.