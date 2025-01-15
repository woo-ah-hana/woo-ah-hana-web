import IconMeeting from '@/app/assets/img/icon-meeting.png';
import IconExercise from '@/app/assets/img/icon-exercise.png';
import IconLocation from '@/app/assets/img/icon-location.png';
import IconHobby from '@/app/assets/img/icon-hobby.png';
import IconShopping from '@/app/assets/img/icon-shopping.png';
import IconAcc from '@/app/assets/img/icon-acc.png';

export const categoryIcons: { [key: string]: string } = {
    meeting : IconMeeting.src,
    location: IconLocation.src,
    exercise:IconExercise.src,
    hobby:IconHobby.src,
    shopping:IconShopping.src,
    acc:IconAcc.src
};

export const categoryColors: { [key: string]: string } = {
    meeting : 'bg-wooahGreen',
    location: 'bg-wooahBlue',
    exercise: 'bg-wooahRed',
    hobby: 'bg-wooahYellow',
    shopping: 'bg-wooahPurple',
    acc: 'bg-wooahMint',
};

/*
정기모임 : meeting
여행 : location
운동 : exercise
취미 : hobby
쇼핑 : shopping
기타 : acc
 */