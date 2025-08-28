import { useState, useEffect } from 'react';
import { getAllCategories, createCategory } from '../api/categoryApi';
import { getAllTags, createTag } from '../api/tagApi';
import { createApp } from '../api/appApi';

export default function useAppSubmission(user) {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    shortDescription: '',
    description: '',
    version: '',
    iconUrl: '',
    screenshotUrls: [],
    fileUrl: '',
    categoryId: '',
    tagIds: [],
    developerWebsite: '',
    developerDisplayName: '',
  });
  const [screenshotInput, setScreenshotInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [addingTag, setAddingTag] = useState(false);
  const [addTagError, setAddTagError] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState('');

  useEffect(() => {
    getAllCategories().then(res => setCategories(res.data));
    getAllTags().then(res => setTags(res.data));
  }, []);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddScreenshot = () => {
    if (screenshotInput.trim()) {
      setForm((prev) => ({ ...prev, screenshotUrls: [...prev.screenshotUrls, screenshotInput.trim()] }));
      setScreenshotInput('');
    }
  };
  const handleRemoveScreenshot = (idx) => {
    setForm((prev) => ({ ...prev, screenshotUrls: prev.screenshotUrls.filter((_, i) => i !== idx) }));
  };
  const handleTagsChange = (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, tagIds: typeof value === 'string' ? value.split(',') : value }));
  };
  const isDuplicateCategory = categories.some(cat => cat.name.trim().toLowerCase() === newCategory.trim().toLowerCase());
  const isDuplicateTag = tags.some(tag => tag.name.trim().toLowerCase() === newTag.trim().toLowerCase());
  const handleAddTag = async () => {
    if (!newTag.trim() || isDuplicateTag) return;
    setAddingTag(true);
    setAddTagError('');
    try {
      const res = await createTag({ name: newTag.trim() });
      setTags((prev) => [...prev, res.data]);
      setForm((prev) => ({ ...prev, tagIds: [...prev.tagIds, res.data.id || res.data._id] }));
      setNewTag('');
    } catch (err) {
      if (err?.response?.status === 409) {
        setAddTagError('Bu etiket zaten mevcut.');
      } else {
        setAddTagError('Etiket eklenemedi.');
      }
    } finally {
      setAddingTag(false);
    }
  };
  const handleAddCategory = async () => {
    if (!newCategory.trim() || isDuplicateCategory) return;
    setAddingCategory(true);
    setAddCategoryError('');
    try {
      const res = await createCategory({ name: newCategory.trim() });
      setCategories((prev) => [...prev, res.data]);
      setForm((prev) => ({ ...prev, categoryId: res.data.id || res.data._id }));
      setNewCategory('');
    } catch (err) {
      if (err?.response?.status === 409) {
        setAddCategoryError('Bu kategori zaten mevcut.');
      } else {
        setAddCategoryError('Kategori eklenemedi.');
      }
    } finally {
      setAddingCategory(false);
    }
  };
  const validateStep = () => {
    if (activeStep === 0) {
      return form.name && form.shortDescription && form.description && form.version;
    }
    if (activeStep === 1) {
      return form.iconUrl && form.fileUrl;
    }
    if (activeStep === 2) {
      return form.categoryId && form.tagIds.length > 0;
    }
    return true;
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        name: form.name,
        description: form.description,
        shortDescription: form.shortDescription,
        categoryId: form.categoryId,
        status: 'PENDING',
        tagIds: form.tagIds,
        iconUrl: form.iconUrl,
        screenshotUrls: form.screenshotUrls,
        developerId: user?.id,
        developerWebsite: form.developerWebsite,
        developerDisplayName: form.developerDisplayName,
      };
      await createApp(payload);
      setSuccess(true);
      setActiveStep(0);
      setForm({
        name: '', shortDescription: '', description: '', version: '', iconUrl: '', screenshotUrls: [], fileUrl: '', categoryId: '', tagIds: [], developerWebsite: '', developerDisplayName: '',
      });
    } catch (err) {
      setError('Uygulama gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };
  return {
    activeStep,
    setActiveStep,
    form,
    setForm,
    screenshotInput,
    setScreenshotInput,
    loading,
    success,
    error,
    categories,
    tags,
    newTag,
    setNewTag,
    addingTag,
    addTagError,
    newCategory,
    setNewCategory,
    addingCategory,
    addCategoryError,
    handleNext,
    handleBack,
    handleChange,
    handleAddScreenshot,
    handleRemoveScreenshot,
    handleTagsChange,
    handleAddTag,
    handleAddCategory,
    validateStep,
    handleSubmit,
    isDuplicateCategory,
    isDuplicateTag,
  };
}

