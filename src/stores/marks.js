import { defineStore } from "pinia";
export const useMarkStore = defineStore("localStorage", {
    state: () => ({
        marks: JSON.parse(localStorage.getItem('marks')) || '' // 默认值
    }),
    actions: {
        setMarks(value) {
            this.marks = value;
            localStorage.setItem("marks", JSON.stringify(value));
        },
        clearMarks() {
            localStorage.removeItem("marks");
            this.marks = ''; 
        }
    }
}
);