import { TestBed } from '@angular/core/testing';

export default class TestHelper {

    /**
     *
     * @param err
     */
    public static processError(err: Error): void {
        console.error(err.message);
        throw err;
    }

    /**
     *
     * @param componentClass
     * @return {{fixture: ComponentFixture<T>, comp: T, de: DebugElement, nativeElement: any}}
     */
    public static getComponentElements(componentClass: any): {
        fixture: any,
        comp: any,
        de: any,
        nativeElement: any
    } {
        if (!componentClass || !componentClass.constructor) {
            throw new Error(`TestHelper: component must be a class`);
        }

        const fixture       = TestBed.createComponent(componentClass);
        const comp          = fixture.componentInstance;
        const de            = fixture.debugElement;
        const nativeElement = de.nativeElement;

        return { fixture, comp, de, nativeElement};
    }

}
