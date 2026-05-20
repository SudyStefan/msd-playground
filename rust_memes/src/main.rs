use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        println!("Usage: cargo run <path> <pattern>");
        return;
    }

    let path = args[1].clone();
    let pattern = args[2].clone();

    println!("Searching {path} for {pattern}!");
}