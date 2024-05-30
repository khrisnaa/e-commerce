'use client';

import { useEffect, useState } from 'react';

import { Modal } from '@/components/modals/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal = ({
  isOpen,
  onConfirm,
  onClose,
  loading,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action can't be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button onClick={onClose} variant="outline" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="destructive" disabled={loading}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
