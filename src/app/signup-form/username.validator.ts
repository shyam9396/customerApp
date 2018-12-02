import { AbstractControl, ValidationErrors } from "@angular/forms";
import { resolve, reject } from "q";

export class userNameValidators {
   static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0 )
            return {cannotContainSpace : true};        
        
        return null
        
    }
    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(control.value === 'shamkumar')
                    resolve ({shouldBeUnique: true});
                else resolve(null);
            },2000);
        });
        
    }
    static userNameLength(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).length <= 5 ){
            return {
                userNameLength : {
                    requiredLength: 5,
                    actualLenght: control.value.length
                }
            }
        }
        else{
            return null
        }
    }
}