import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

function EducationForm({ formData, setFormData }) {
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  return (
    <div className="space-y-4">
      <button
        onClick={addEducation}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
          flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Ta'lim qo'shish
      </button>

      {formData.education.map((edu) => (
        <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Ta'lim</h3>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <input
            type="text"
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Daraja/Yo'nalish"
          />

          <input
            type="text"
            value={edu.institution}
            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="O'quv muassasasi"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Boshlanish (2018)"
            />
            <input
              type="text"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Tugash (2022)"
            />
          </div>

          <textarea
            value={edu.description}
            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Qo'shimcha ma'lumot..."
          />
        </div>
      ))}
    </div>
  );
}

export default EducationForm;