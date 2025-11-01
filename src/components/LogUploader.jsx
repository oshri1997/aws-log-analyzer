import { useState } from 'react';

function LogUploader({ onFileLoad }) {
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (file && (file.name.endsWith('.log') || file.name.endsWith('.txt'))) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => onFileLoad(e.target.result);
      reader.readAsText(file);
    } else {
      alert('Please select a .log or .txt file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div 
      className={`bg-white rounded-2xl p-6 text-center shadow-xl transition-all duration-300 border-2 border-dashed ${
        isDragging ? 'border-indigo-500 bg-indigo-50 scale-105' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
    >
      <div className="flex items-center justify-center gap-4">
        <div className="text-4xl">📁</div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Drag log file here or</p>
          <label className="inline-block">
            <input 
              type="file" 
              accept=".log,.txt"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full cursor-pointer font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Choose File
            </span>
          </label>
        </div>
        {fileName && (
          <p className="text-green-600 font-bold text-sm">
            ✅ {fileName}
          </p>
        )}
      </div>
    </div>
  );
}

export default LogUploader;
