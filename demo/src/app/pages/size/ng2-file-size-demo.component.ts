import {
    Component,
    ViewChild,
    OnInit,
} from '@angular/core';
import {
    Ng2FileSizeDirective,
    RangeFileSizeRestrictions
} from 'ng2-file-size';

@Component({
    selector: 'ng2-file-size-demo',
    styles: [`
        #ng2-file-size-demo-validation {
            padding-top: 30px;    
        }
        
        h3 {
            padding: 30px;
        }
        
        li {
            list-style: none;
        }
    `],
    template: `
        <form id="ng2-file-size-demo-validation">
            <h1>Ng2 File Size Directive demo</h1>
            <div class="form-group file-size-default-container">
                <h3>
                    Specify restrictions
                </h3>
                <div class="form-group">
                    <label for="sizeRestrictionsMinInput">
                        <strong>Min size:</strong>
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="sizeRestrictionsMinInput"
                        name="sizeRestrictionsMin"
                        [(ngModel)]="sizeRestrictions.min"
                    />
                </div>
                <div class="form-group">
                    <label for="sizeRestrictionsMaxInput">
                        <strong>Max size:</strong>
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="sizeRestrictionsMaxInput"
                        name="sizeRestrictionsMax"
                        [(ngModel)]="sizeRestrictions.max"
                    />
                </div>
                <div class="form-group">
                    <label for="sizeRestrictionsErrorMsgInput">
                        <strong>Error message:</strong>
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="sizeRestrictionsErrorMsgInput"
                        name="sizeRestrictionsErrorMsg"
                        [(ngModel)]="errorMessage"
                    />
                </div>
            </div>
            <div class="form-group file-size-container">
                <label for="sizeRestrictedFileInput">
                    <strong>Size restricted field:</strong>
                </label>
                <input 
                    type="file"
                    class="form-control-file"
                    id="sizeRestrictedFileInput"
                    name="sizeRestrictedFile"
                    #sizeRestrictedFileInput="ngModel"
                    #sizeRestrictedHtmlElement
                    [(ngModel)]="sizeRestrictedFile"
                    [ng2FileSize]="sizeRestrictions"
                    [ng2FileSizeErrorMsg]="errorMessage"
                    #ng2fsd="ng2FileSizeDirective"                    
                />
                <div class="alert alert-success" *ngIf="sizeRestrictedFileInput.valid">
                    <strong>Valid size: </strong>
                    <span>
                        {{ sizeRestrictedHtmlElement.files.item(0)?.size || 0 }} bytes
                    </span>
                </div>
                <div class="alert alert-danger" *ngIf="sizeRestrictedFileInput.invalid">
                    <strong class="size-error-msg-text">{{sizeRestrictedFileInput.errors.size}}</strong>
                    <span>
                        {{ sizeRestrictedHtmlElement.files.item(0)?.size || 0 }} bytes
                    </span>
                </div>
            </div>
        </form>
    `
})
export class Ng2FileSizeDemoComponent implements OnInit {
    public sizeRestrictedFile: any;
    public errorMessage: string;
    public sizeRestrictions: RangeFileSizeRestrictions = {
      min: 1024,       // 1kb
      max: 1024 * 1024 // 1mb
    };

    /**
     * @public
     * @type {Ng2FileSizeDirective}
     */
    @ViewChild('ng2fsd')
    public ng2fsd: Ng2FileSizeDirective;

    /**
     *
     * @public
     * @returns {void}
     */
    public ngOnInit(): void {
      this.errorMessage = this.ng2fsd.ng2FileSizeErrorMsg;
    }
}
