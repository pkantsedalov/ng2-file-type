import {
    Component,
    ViewChild,
    OnInit
} from '@angular/core';
import { Ng2FileTypeDirective } from 'ng2-file-type';

@Component({
    selector: 'ng2-file-type-demo',
    styles: [`
        #ng2-file-type-demo-validation {
            padding-top: 30px;
            padding-bottom: 30px;
        }
        
        h3 {
            padding: 30px;
        }
        
        li {
            list-style: none;
        }
    `],
    template: `
        <form id="ng2-file-type-demo-validation">
            <h1>Ng2 File Type Directive demo</h1>
            <div class="form-group file-restriction-container">
                <h3>Select restriction</h3>
                <div class="form-group">
                    <label for="stringRestriction">string</label>
                    <input 
                        type="radio"
                        name="restriction"
                        id="stringRestriction"
                        [(ngModel)]="restriction"
                        value="string"
                    />
                </div>
                <div class="form-group">
                    <label for="arrayRestriction">array</label>
                    <input
                        type="radio"
                        name="restriction"
                        id="arrayRestriction"
                        [(ngModel)]="restriction"
                        value="array"
                    />
                </div>
                <div class="form-group">
                    <label for="regexRestriction">regex</label>
                    <input
                        type="radio"
                        name="restriction"
                        id="regexRestriction"
                        [(ngModel)]="restriction"
                        value="regex"
                    />
                </div>
            </div>
            <div class="form-group error-message-container">
                <h3>Specify error message</h3>
                <div class="form-group">
                    <label for="errorMessageInput">Error message:</label>
                    <input
                        type="text"
                        name="errorMessage"
                        id="errorMessageInput"
                        [(ngModel)]="errorMessage"
                    />
                </div>
            </div>
            <div class="form-group file-type-container">
                <label for="typeRestrictedFileInput">
                    <h3>Current restriction - {{restriction}}: <i>{{typeRestrictions[restriction]}}</i></h3>
                </label>
                <input 
                    type="file"
                    class="form-control-file"
                    id="typeRestrictedFileInput"
                    name="typeRestrictedFile"
                    #typeRestrictedFileInput="ngModel"
                    #stringTypeRestrictedHtmlElement
                    [(ngModel)]="typeRestrictedFile"
                    [ng2FileType]="typeRestrictions[restriction]"
                    [fileTypeErrorMsg]="errorMessage"
                    #ng2ftd="ng2FileTypeDirective"                    
                />
                <div class="alert alert-success" *ngIf="typeRestrictedFileInput.valid">
                    <strong>Valid type: </strong>
                    <span>
                        {{ stringTypeRestrictedHtmlElement.files.item(0)?.type || 'not specified yet' }}
                    </span>
                </div>
                <div class="alert alert-danger" *ngIf="typeRestrictedFileInput.invalid">
                    <strong class="type-error-msg-text">{{typeRestrictedFileInput.errors.type}}</strong>
                    <span>
                        {{ stringTypeRestrictedHtmlElement.files.item(0)?.type || 'not specified' }}
                    </span>
                </div>
            </div>
        </form>
    `
})
export class Ng2FileTypeDemoComponent implements OnInit {
    public typeRestrictedFile: any;
    public errorMessage: string;
    public restriction: string = 'string';
    public typeRestrictions: any = {
      string: 'application/json',
      array:  ['application/json', 'text/plain'],
      regex:  /(.*)\/json/
    };

    /**
     * @public
     * @type {Ng2FileTypeDirective}
     */
    @ViewChild('ng2ftd')
    public ng2ftd: Ng2FileTypeDirective;

    /**
     *
     * @public
     * @returns {void}
     */
    public ngOnInit(): void {
      this.errorMessage = this.ng2ftd.fileTypeErrorMsg;
    }
}
