import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Calendar, CheckCircle2, Sparkles, Check } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-32">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Отслеживайте свои привычки
              <span className="text-primary"> легко и эффективно</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Создавайте и отслеживайте свои привычки с помощью красивой
              визуализации активности. Вдохновляйтесь своим прогрессом каждый
              день.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/app">
                <Button size="lg" className="gap-2">
                  Начать сейчас <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Визуальный календарь</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Красивая сетка активности, вдохновленная GitHub, помогает
                  визуально отслеживать ваш прогресс
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Множество привычек</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Создавайте и отслеживайте неограниченное количество привычек с
                  индивидуальной статистикой
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Мотивация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Следите за своими достижениями и вдохновляйтесь на новые
                  свершения
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <Card className="bg-primary/5">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Присоединяйтесь к тысячам пользователей, которые уже улучшают
                свою жизнь
              </p>
              <Link href="/app">
                <Button size="lg" className="gap-2">
                  Создать первую привычку <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
