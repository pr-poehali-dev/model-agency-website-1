import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

interface LoginFormState {
  username: string;
  password: string;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [form, setForm] = useState<LoginFormState>({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = () => {
    onLogin(form.username, form.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/5 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-playfair">Админ-панель</CardTitle>
          <CardDescription>Войдите для управления моделями</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Логин</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <Button className="w-full bg-black hover:bg-black/90" onClick={handleSubmit}>
            Войти
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
            На главную
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
