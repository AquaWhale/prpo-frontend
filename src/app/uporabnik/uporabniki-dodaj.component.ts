import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Uporabnik} from './models/uporabnik';
import {UporabnikService} from './services/uporabnik.service';

@Component({
    moduleId: module.id,
    selector: 'dodaj-uporabniki',
    templateUrl: 'uporabniki-dodaj.component.html'
})
export class UporabnikiDodajComponent {
    uporabnik: Uporabnik = new Uporabnik;
    public napaka: string = '';

    constructor(private uporabnikService: UporabnikService,
                private router: Router) {
    }

    veljavniPodatki(): boolean {
        this.napaka = '';
        if (!this.uporabnik.email || !this.uporabnik.ime || !this.uporabnik.priimek || !this.uporabnik.uporabniskoIme) {
            this.napaka = 'Zahtevani so vsi podatki';
            return false;
        }
        return true;
    }

    submitForm(): void {
        if (this.veljavniPodatki()) {
            this.uporabnikService.create(this.uporabnik, this.showError.bind(this))
                .then(uporabnik => {
                    if (uporabnik) {
                        this.router.navigate(['/uporabniki']);
                    }
                });
        }
    }

    nazaj(): void {
        this.router.navigate(['/uporabniki']);
    }

    showError(error: any): void {
        console.log("Prišlo je do napake:");
        console.log(error);
        this.napaka = 'Prišlo je do napake'
        switch (error.error.napaka) {
            case 'Nevaliden mail':
                this.napaka = 'Elektronski naslov ne obstaja, prosimo vpišite validnega.';
                break;
            default:
                this.napaka = error.error.napaka;
        }
    }

}
