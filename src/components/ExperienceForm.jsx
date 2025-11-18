import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

function ExperienceForm({ formData, setFormData }) {
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  return (
    <div className="space-y-4">
      <button
        onClick={addExperience}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
          flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Ish tajribasi qo'shish
      </button>

      {formData.experience.map((exp) => (
        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Ish tajribasi</h3>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <input
            type="text"
            value={exp.position}
            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Lavozim"
          />

          <input
            type="text"
            value={exp.company}
            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Kompaniya nomi"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Boshlanish (2020)"
            />
            <input
              type="text"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Tugash (2023)"
            />
          </div>

          <textarea
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Vazifalar va yutuqlar..."
          />
        </div>
      ))}
    </div>
  );
}

export default ExperienceForm;