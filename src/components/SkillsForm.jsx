import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

function SkillsForm({ formData, setFormData }) {
  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: '50' }]
    }));
  };

  const removeSkill = (id) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const updateSkill = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  return (
    <div className="space-y-4">
      <button
        onClick={addSkill}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
          flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Ko'nikma qo'shish
      </button>

      {formData.skills.map((skill) => (
        <div key={skill.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg mr-2"
              placeholder="Ko'nikma nomi (React, JavaScript...)"
            />
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Daraja</span>
              <span>{skill.level}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsForm;