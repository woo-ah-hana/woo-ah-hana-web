"use client";

import { Card, CardTitle } from "@/app/ui/molecule/card/card";
import {
  categoryColors,
  categoryIcons,
  categoryTextColors,
} from "@/app/ui/atom/category/category";

interface Category {
  key: string;
  label: string;
}

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (key: string) => void;
}

export function CategoryMenu({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryMenuProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card
          key={category.key}
          onClick={() => onCategorySelect(category.key)}
          className={`relative pb-[100%] overflow-hidden rounded-lg cursor-pointer ${
            categoryColors[category.key]
          } ${
            selectedCategory === category.key
              ? "border-4 border-blue-500 opacity-90"
              : "hover:opacity-80"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
            <img
              src={categoryIcons[category.key]}
              alt={category.label}
              className="mb-[10%] w-[70%] h-[70%]"
            />
            <CardTitle className="text-center">
              <div
                className={`${
                  categoryTextColors[category.key]
                } font-bold text-[calc(10px+2vw)]`}
              >
                {category.label}
              </div>
            </CardTitle>
          </div>
        </Card>
      ))}
    </div>
  );
}
