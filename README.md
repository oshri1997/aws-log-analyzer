# 🔍 AWS Log Analyzer

אפליקציית React מתקדמת לניתוח VPC Flow Logs של AWS עם ממשק משתמש אינטואיטיבי ויכולות חיפוש מתקדמות.

## ✨ תכונות עיקריות

- **העלאת קבצי לוג** - תמיכה בקבצי `.log` ו-`.txt` עם drag & drop
- **חיפוש מתקדם** - חיפוש לפי כתובת IP מקור עם debouncing
- **זיהוי שירותים** - זיהוי אוטומטי של שירותי AWS לפי פורטים
- **מיון דינמי** - מיון לפי כל עמודה בטבלה
- **טעינה הדרגתית** - infinite scrolling לביצועים מיטביים
- **ייצוא נתונים** - ייצוא התוצאות המסוננות לקובץ טקסט
- **עיצוב רספונסיבי** - מותאם לכל גדלי מסך

## 🛠️ טכנולוגיות

- **React 19** - ספריית UI מתקדמת
- **Vite** - כלי build מהיר
- **Tailwind CSS** - framework CSS מודרני
- **ESLint** - linting לקוד איכותי

## 🚀 התקנה והרצה

```bash
# שכפול הפרויקט
git clone <repository-url>
cd log-analyzer-react

# התקנת dependencies
npm install

# הרצה במצב פיתוח
npm run dev

# בניית הפרויקט לפרודקשן
npm run build

# הרצת preview של הבנייה
npm run preview
```

## 📋 שירותים נתמכים

האפליקציה מזהה אוטומטית את השירותים הבאים לפי פורטים:

| פורט | שירות |
|------|--------|
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

## 📊 פורמט קובץ הלוג

האפליקציה מצפה לקבצי VPC Flow Logs בפורמט הסטנדרטי של AWS:

```
version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status
2 123456789012 eni-1235b8ca 172.31.16.139 172.31.16.21 20641 22 6 20 4249 1418530010 1418530070 ACCEPT OK
```

## 🎯 שימוש

1. **העלאת קובץ** - גרור קובץ לוג לאזור המיועד או לחץ על "Choose File"
2. **חיפוש** - הקלד כתובת IP מקור בשדה החיפוש
3. **מיון** - לחץ על כותרות העמודות למיון
4. **ייצוא** - לחץ על "Export to .txt" לשמירת התוצאות

## 🏗️ מבנה הפרויקט

```
src/
├── components/
│   ├── LogUploader.jsx    # קומפוננט העלאת קבצים
│   ├── SearchBar.jsx      # שורת חיפוש
│   └── LogTable.jsx       # טבלת התוצאות
├── App.jsx                # קומפוננט ראשי
├── main.jsx              # נקודת כניסה
└── index.css             # סגנונות גלובליים
```

## 🔧 פיתוח

```bash
# הרצת linting
npm run lint

# הרצה במצב פיתוח עם hot reload
npm run dev
```

## 📝 רישיון

פרויקט זה הוא קוד פתוח ומיועד למטרות חינוכיות ופיתוח.