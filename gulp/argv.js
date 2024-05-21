import args from 'command-line-args';
export const argv = args([
    { name: `all`, type: Boolean },
    { name: 'verbose', alias: `v`, type: Boolean },
    { name: `target`, type: String, defaultValue: `` },
    { name: `module`, type: String, defaultValue: `` },
    { name: `coverage`, type: Boolean, defaultValue: false },
    { name: `tests`, type: String, multiple: true, defaultValue: [`spec/*`] },
    { name: `targets`, alias: `t`, type: String, multiple: true, defaultValue: [] },
    { name: `modules`, alias: `m`, type: String, multiple: true, defaultValue: [] },
], { partial: true });

export const { targets, modules } = argv;

if (argv.target === `src`) {
    argv.target && !targets.length && targets.push(argv.target);
} else {
    argv.target && !targets.length && targets.push(argv.target);
    argv.module && !modules.length && modules.push(argv.module);
    (argv.all || !targets.length) && targets.push(`all`);
    (argv.all || !modules.length) && modules.push(`all`);
}
