import type { Meta, StoryObj } from '@storybook/react';

import { Dialog, DialogContent, DialogTrigger } from '@/app/ui/molecule/dialog/dialog';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';


const meta = {
  title: 'view/molecule/Dialog',
  component: Dialog,
  decorators: [
    (Story) => (
      <div className='w-96'>
        <Story/>
      </div>
    ),
  ],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dialog Title',
    description: '다이얼로그 설명 예시입니다.',
    titleClassName: 'text-lg font-bold text-center mb-4',
    descriptionClassName: 'text-sm text-gray-500 mb-4',
    className:''
  } as Partial<React.ComponentProps<typeof DialogContent>>,
  
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton>Open Dialog</AchromaticButton>
      </DialogTrigger>
      <DialogContent {...args}>
        <p>다이얼 로그 컨텐츠 예시입니다. 이 공간에 어떤 JSX 요소도 들어올 수 있습니다.</p>
      </DialogContent>
    </Dialog>
  )
}