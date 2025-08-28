import React from 'react';
import {
  Box, Button, TextField, Typography, MenuItem, Chip, Alert, InputLabel, FormControl, Select, OutlinedInput, Stepper, Step, StepLabel, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const steps = [
  'Uygulama Bilgisi',
  'Medya & Dosyalar',
  'Etiket & Kategori',
  'Gözden Geçir & Gönder'
];

function AppAddForm({
  activeStep,
  form,
  screenshotInput,
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
  setScreenshotInput,
  isDuplicateCategory,
  isDuplicateTag
}) {
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField fullWidth label="Uygulama Adı" name="name" value={form.name} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Kısa Açıklama" name="shortDescription" value={form.shortDescription} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Açıklama" name="description" value={form.description} onChange={handleChange} margin="normal" multiline minRows={3} required />
            <TextField fullWidth label="Sürüm" name="version" value={form.version} onChange={handleChange} margin="normal" required />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField fullWidth label="Uygulama İkonu URL" name="iconUrl" value={form.iconUrl} onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Uygulama Dosyası URL" name="fileUrl" value={form.fileUrl} onChange={handleChange} margin="normal" required />
            <Box mt={2} mb={1}>
              <Typography variant="subtitle1">Ekran Görüntüsü URL'leri</Typography>
              <Box display="flex" gap={1}>
                <TextField label="Ekran Görüntüsü URL" value={screenshotInput} onChange={e => setScreenshotInput(e.target.value)} size="small" />
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
                value={form.category ? form.category.id : ''}
                onChange={e => {
                  const selectedId = e.target.value;
                  const selectedCategory = categories.find(cat => (cat.id || cat._id) === selectedId || String(cat.id || cat._id) === String(selectedId));
                  handleChange({ target: { name: 'category', value: selectedCategory || null } });
                }}
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
                value={form.tagIds || []}
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
            <Typography variant="h6">Başvurunu Gözden Geçir</Typography>
            <Box mt={2}>
              <Typography><b>Ad:</b> {form.name}</Typography>
              <Typography><b>Kısa Açıklama:</b> {form.shortDescription}</Typography>
              <Typography><b>Açıklama:</b> {form.description}</Typography>
              <Typography><b>Sürüm:</b> {form.version}</Typography>
              <Typography><b>İkon URL:</b> {form.iconUrl}</Typography>
              <Typography><b>Dosya URL:</b> {form.fileUrl}</Typography>
              <Typography><b>Ekran Görüntüleri:</b> {form.screenshotUrls.join(', ')}</Typography>
              <Typography><b>Kategori:</b> {categories.find(c => c.id === form.categoryId || c._id === form.categoryId)?.name}</Typography>
              <Typography><b>Etiketler:</b> {form.tagIds.map(id => tags.find(t => t.id === id || t._id === id)?.name).join(', ')}</Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  function validateStep() {
    if (activeStep === 0) {
      return form.name && form.shortDescription && form.description && form.version;
    }
    if (activeStep === 1) {
      return form.iconUrl && form.fileUrl;
    }
    if (activeStep === 2) {
      return form.category && form.tagIds && form.tagIds.length > 0;
    }
    return true;
  }

  return (
    <Box>
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">Uygulama Ekle</Typography>
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
          <Button disabled={activeStep === 0} onClick={handleBack}>Geri</Button>
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext} disabled={!validateStep()}>İleri</Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Gönderiliyor...' : 'Gönder'}</Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AppAddForm;
