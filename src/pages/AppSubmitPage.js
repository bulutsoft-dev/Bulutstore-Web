import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Chip,
  Alert,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  Stepper,
  Step,
  StepLabel,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllCategories, createCategory } from '../api/categoryApi';
import { getAllTags, createTag } from '../api/tagApi';
import { createApp } from '../api/appApi';
import { useAuthContext } from '../context/AuthContext';

const steps = [
  'App Info',
  'Media & Files',
  'Tags & Category',
  'Review & Submit'
];

const AppSubmitPage = () => {
  const { user } = useAuthContext();
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
  const [catLoading, setCatLoading] = useState(true);
  const [tagLoading, setTagLoading] = useState(true);
  const [catError, setCatError] = useState('');
  const [tagError, setTagError] = useState('');
  const [newTag, setNewTag] = useState('');
  const [addingTag, setAddingTag] = useState(false);
  const [addTagError, setAddTagError] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState('');

  useEffect(() => {
    setCatLoading(true);
    getAllCategories()
      .then(res => setCategories(res.data))
      .catch(() => setCatError('Kategoriler yüklenemedi.'))
      .finally(() => setCatLoading(false));
    setTagLoading(true);
    getAllTags()
      .then(res => setTags(res.data))
      .catch(() => setTagError('Etiketler yüklenemedi.'))
      .finally(() => setTagLoading(false));
  }, []);

  // Step navigation
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Screenshot URL add/remove
  const handleAddScreenshot = () => {
    if (screenshotInput.trim()) {
      setForm((prev) => ({ ...prev, screenshotUrls: [...prev.screenshotUrls, screenshotInput.trim()] }));
      setScreenshotInput('');
    }
  };
  const handleRemoveScreenshot = (idx) => {
    setForm((prev) => ({ ...prev, screenshotUrls: prev.screenshotUrls.filter((_, i) => i !== idx) }));
  };

  // Tag selection
  const handleTagsChange = (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, tagIds: typeof value === 'string' ? value.split(',') : value }));
  };

  const isDuplicateCategory = categories.some(cat => cat.name.trim().toLowerCase() === newCategory.trim().toLowerCase());
  const isDuplicateTag = tags.some(tag => tag.name.trim().toLowerCase() === newTag.trim().toLowerCase());

  // Add new tag
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

  // Add new category
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

  // Step validation
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

  // Submit
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

  // Step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField fullWidth label="App Name" name="name" value={form.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Short Description" name="shortDescription" value={form.shortDescription} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleChange} margin="normal" multiline minRows={3} required />
            <TextField fullWidth label="Version" name="version" value={form.version} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Developer Display Name" name="developerDisplayName" value={form.developerDisplayName} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Developer Website" name="developerWebsite" value={form.developerWebsite} onChange={handleChange} margin="normal" />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField fullWidth label="App Icon URL" name="iconUrl" value={form.iconUrl} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="App File URL" name="fileUrl" value={form.fileUrl} onChange={handleChange} margin="normal" required />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle1">Screenshot URLs</Typography>
              <Box display="flex" gap={1}>
                <TextField label="Screenshot URL" value={screenshotInput} onChange={e => setScreenshotInput(e.target.value)} size="small" />
                <IconButton color="primary" onClick={handleAddScreenshot} disabled={!screenshotInput.trim()}><AddIcon /></IconButton>
              </Box>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {form.screenshotUrls.map((url, idx) => (
                  <Chip key={idx} label={url} onDelete={() => handleRemoveScreenshot(idx)} deleteIcon={<DeleteIcon />} />
                ))}
              </Box>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Kategori</InputLabel>
              <Select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                input={<OutlinedInput label="Kategori" />}
                required
                variant="outlined"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id || cat._id} value={cat.id || cat._id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" gap={1} alignItems="center" mt={1}>
              <TextField label="Yeni Kategori" value={newCategory} onChange={e => setNewCategory(e.target.value)} size="small" />
              <Button variant="outlined" onClick={handleAddCategory} disabled={addingCategory || !newCategory.trim() || isDuplicateCategory}>{addingCategory ? 'Ekleniyor...' : 'Ekle'}</Button>
              {addCategoryError && <Typography color="error">{addCategoryError}</Typography>}
              {isDuplicateCategory && <Typography color="error">Bu kategori zaten mevcut.</Typography>}
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Etiketler</InputLabel>
              <Select
                multiple
                name="tagIds"
                value={form.tagIds}
                onChange={handleTagsChange}
                input={<OutlinedInput label="Etiketler" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const tag = tags.find(t => t.id === id || t._id === id);
                      return <Chip key={id} label={tag?.name || id} />;
                    })}
                  </Box>
                )}
                variant="outlined"
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id || tag._id} value={tag.id || tag._id}>{tag.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" gap={1} alignItems="center" mt={1}>
              <TextField label="Yeni Etiket" value={newTag} onChange={e => setNewTag(e.target.value)} size="small" />
              <Button variant="outlined" onClick={handleAddTag} disabled={addingTag || !newTag.trim() || isDuplicateTag}>{addingTag ? 'Ekleniyor...' : 'Ekle'}</Button>
              {addTagError && <Typography color="error">{addTagError}</Typography>}
              {isDuplicateTag && <Typography color="error">Bu etiket zaten mevcut.</Typography>}
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6">Review Your App Submission</Typography>
            <Box mt={2}>
              <Typography><b>Name:</b> {form.name}</Typography>
              <Typography><b>Short Description:</b> {form.shortDescription}</Typography>
              <Typography><b>Description:</b> {form.description}</Typography>
              <Typography><b>Version:</b> {form.version}</Typography>
              <Typography><b>Icon URL:</b> {form.iconUrl}</Typography>
              <Typography><b>File URL:</b> {form.fileUrl}</Typography>
              <Typography><b>Screenshots:</b> {form.screenshotUrls.join(', ')}</Typography>
              <Typography><b>Category:</b> {categories.find(c => c.id === form.categoryId || c._id === form.categoryId)?.name}</Typography>
              <Typography><b>Tags:</b> {form.tagIds.map(id => tags.find(t => t.id === id || t._id === id)?.name).join(', ')}</Typography>
              <Typography><b>Developer Display Name:</b> {form.developerDisplayName}</Typography>
              <Typography><b>Developer Website:</b> {form.developerWebsite}</Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">App Submission</Typography>
      </Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={3}>
        {getStepContent(activeStep)}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Uygulama başarıyla gönderildi!</Alert>}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext} disabled={!validateStep()}>Next</Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AppSubmitPage;
