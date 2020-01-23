import { module } from 'modujs';

export default class extends module {
    constructor(m) {
        super(m);

        this.settings = {
            factor: 1,
            progress: 0,
            play: true
        }
    }

    init() {
        this.gui = new dat.GUI();
        this.factorController = this.gui.add(this.settings,'factor', -2, 2);
        this.progressController = this.gui.add(this.settings,'progress', 0, 1).step(0.01);
        this.playController = this.gui.add(this.settings,'play');

        this.factorController.onChange((value) => {
            this.call('updateFactor',value,'DistortionExample')
        });

        this.progressController.onChange((value) => {
            this.call('updateProgress',value,'DistortionExample')
        });

        this.playController.onChange((value) => {
            this.call('updatePlay',value,'DistortionExample')
        });
    }

    updateProgress(progress) {
        this.progressController.setValue(progress);
    }
}
