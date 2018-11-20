export interface Category {
    name: string;
    icon: string;
    color: string;
}

export class CategoryHelper {
    static categories: Category[] = [
        { name: 'silks',   icon: 'aerial.svg',  color: '#2196F3', },
        { name: 'hoop',    icon: 'hoops.svg',   color: '#7B1FA2', },
        { name: 'trapeze', icon: 'trapeze.svg', color: '#B2EBF2', },
        { name: 'acro',    icon: 'acro.svg',    color: '#FF5722', },
        { name: 'cali',    icon: 'cali.svg',    color: '#3F51B5', },
        { name: 'pole',    icon: 'pole.svg',    color: '#4CAF50', },
    ];

    static all: Category = { name: 'all', icon: 'all.svg', color: '#2196F3', };

    static getIcon(name: string): string {
        const c = this.categories.find(i => name === i.name );

        return (c) ? c.icon : null;
    }

    static getColor(name: string): string {
        const c = this.categories.find(i => name === i.name );

        return (c) ? c.color : null;
    }
}