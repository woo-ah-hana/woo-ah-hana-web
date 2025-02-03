import IconMeeting from "@/app/assets/img/icon-meeting.png";
import IconExercise from "@/app/assets/img/icon-exercise.png";
import IconMeal from "@/app/assets/img/icon-meal.png";
import IconLocation from "@/app/assets/img/icon-location.png";
import IconHobby from "@/app/assets/img/icon-hobby.png";
import IconShopping from "@/app/assets/img/icon-shopping.png";
import IconAcc from "@/app/assets/img/icon-acc.png";
import IconHobbyBg from "@/app/assets/img/icon-hobbyBg.png";
import IconHobbyBg1 from "@/app/assets/img/food.jpg";

export const categoryIcons: { [key: string]: string } = {
  meeting: IconMeeting.src,
  location: IconLocation.src,
  exercise: IconExercise.src,
  meal: IconMeal.src,
  hobby: IconHobby.src,
  shopping: IconShopping.src,
  acc: IconAcc.src,
};

export const categoryColors: { [key: string]: string } = {
  meeting: "bg-wooahGreen",
  location: "bg-wooahBlue",
  exercise: "bg-wooahRed",
  meal: "bg-wooahRed",
  hobby: "bg-wooahYellow",
  shopping: "bg-wooahPurple",
  acc: "bg-wooahMint",
};

export const categoryTextColors: { [key: string]: string } = {
  meeting: "text-wooahDeepGreen",
  location: "text-wooahDeepBlue",
  exercise: "text-wooahDeepRed",
  meal: "text-wooahDeepRed",
  hobby: "text-wooahDeepYellow",
  shopping: "text-wooahDeepPurple",
  acc: "text-wooahDeepMint",
};

export const categoryIconBg: { [key: string]: string } = {
  meeting: IconMeeting.src,
  location: IconLocation.src,
  exercise: IconExercise.src,
  meal: IconMeal.src,
  hobby: IconHobbyBg1.src,
  shopping: IconShopping.src,
  acc: IconAcc.src,
};
/*
정기모임 : meeting
여행 : location
식사 : meal
취미 : hobby
쇼핑 : shopping
기타 : acc
 */
