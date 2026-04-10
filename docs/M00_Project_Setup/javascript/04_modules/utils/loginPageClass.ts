import {page} from '@playwright/test';

export class loginPage{
    constructor(private page:page){}

    async goto(){
        await this.page.goto('/login')
    }

    async login(email:string, password:string){
        await this.page.getByPlaceholder('Email').fill('email');
        await this.page.getByPlaceholder('Password').fill('password');
        await this.page.getByRole('button', {name :'Login'}).click();
    }
}