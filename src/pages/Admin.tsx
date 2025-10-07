import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/admin/LoginForm';
import ModelsTable, { Model } from '@/components/admin/ModelsTable';
import ModelDialog, { ModelForm } from '@/components/admin/ModelDialog';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [modelForm, setModelForm] = useState<ModelForm>({
    name: '',
    category: 'basic',
    imageUrl: '',
    height: 170,
    measurements: '',
    experienceYears: 0,
    pricePerHour: 0,
    description: '',
    isAvailable: true
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const AUTH_API = 'https://functions.poehali.dev/7b10efe2-1f83-4062-91e1-fd9eaca39211';
  const MODELS_API = 'https://functions.poehali.dev/fda65910-2f69-4b23-be36-4259b965eca3';
  const ADMIN_MODELS_API = 'https://functions.poehali.dev/3caaab7f-6a87-413e-9e31-3019d5ce61e1';
  const UPLOAD_API = 'https://functions.poehali.dev/2fad90a8-00bf-4d6d-95a8-bcabc08185e2';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
      setIsAuthenticated(true);
      fetchModels();
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(AUTH_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        setAdminToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        toast({ title: 'Успех!', description: 'Вы вошли в админ-панель' });
        fetchModels();
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось войти', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken('');
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await fetch(MODELS_API);
      const data = await response.json();
      setModels(data.models || []);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить модели', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingModel(null);
    setModelForm({
      name: '',
      category: 'basic',
      imageUrl: '',
      height: 170,
      measurements: '',
      experienceYears: 0,
      pricePerHour: 0,
      description: '',
      isAvailable: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (model: Model) => {
    setEditingModel(model);
    setModelForm({
      id: model.id,
      name: model.name,
      category: model.category,
      imageUrl: model.imageUrl,
      height: model.height,
      measurements: model.measurements,
      experienceYears: model.experienceYears,
      pricePerHour: model.pricePerHour,
      description: model.description,
      isAvailable: model.isAvailable
    });
    setIsDialogOpen(true);
  };

  const handleSaveModel = async () => {
    const method = editingModel ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(ADMIN_MODELS_API, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken
        },
        body: JSON.stringify(modelForm)
      });

      const data = await response.json();

      if (data.success) {
        toast({ title: 'Успех!', description: data.message });
        setIsDialogOpen(false);
        fetchModels();
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить модель', variant: 'destructive' });
    }
  };

  const handleDeleteModel = async (modelId: number) => {
    if (!confirm('Вы уверены, что хотите скрыть эту модель?')) return;

    try {
      const response = await fetch(`${ADMIN_MODELS_API}?id=${modelId}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Token': adminToken
        }
      });

      const data = await response.json();

      if (data.success) {
        toast({ title: 'Успех!', description: data.message });
        fetchModels();
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить модель', variant: 'destructive' });
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-playfair font-bold">Админ-панель</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="Home" size={18} className="mr-2" />
              На сайт
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-playfair font-bold">Управление моделями</h2>
          <Button className="bg-black hover:bg-black/90" onClick={openCreateDialog}>
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить модель
          </Button>
        </div>

        <ModelsTable 
          models={models} 
          loading={loading} 
          onEdit={openEditDialog} 
          onDelete={handleDeleteModel} 
        />
      </main>

      <ModelDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingModel={editingModel}
        modelForm={modelForm}
        onModelFormChange={setModelForm}
        onSave={handleSaveModel}
        uploadApi={UPLOAD_API}
      />
    </div>
  );
};

export default Admin;
