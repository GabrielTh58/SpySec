import { useState } from 'react';
import { toast } from 'sonner';
import { useGamification } from '@/data/hooks/useGamification';
import { useSession } from '@/data/hooks/useSession';
import { IdUnique } from '@spysec/utils';

export function useFeedbackWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'BUG' | 'IDEIA' | 'OUTRO'>('BUG');
    const [mood, setMood] = useState<'HAPPY' | 'NEUTRAL' | 'SAD'>('NEUTRAL');
    const [sending, setSending] = useState(false);

    const { profile } = useGamification();
    const { user } = useSession();

    const submitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setSending(true);
        try {
            const N8N_WEBHOOK_URL = process.env.N8N_FEEDBACK_URL || '';

            if (!N8N_WEBHOOK_URL) {
                console.warn('Webhook URL não definida');
            }

            const payload = {
                id: IdUnique.generate(),
                user: {
                    userId: user?.id,
                    email: user?.email,
                    name: user?.name,
                    level: profile?.currentLevel || 0
                },
                report: {
                    type,
                    message,
                    mood,
                    page: window.location.pathname,
                    userAgent: navigator.userAgent
                },
                timestamp: new Date().toISOString(),
            };

            await fetch(N8N_WEBHOOK_URL, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            toast.success("Feedback enviado. Obrigado!");
            setIsOpen(false);
            setMessage('');
            setMood('NEUTRAL');
            setType('BUG'); 
        } catch (error) {
            console.error(error);
            toast.error("Erro ao enviar feedback.");
        } finally {
            setSending(false);
        }
    };

    return {
        isOpen,
        setIsOpen,
        message,
        setMessage,
        type,
        setType,
        mood,
        setMood,
        sending,
        submitFeedback
    };
}