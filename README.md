# little-manager

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)
[![Gitlab Pipeline Status](https://gitlab.com/benmi/little-manager/badges/main/pipeline.svg)](https://gitlab.com/benmi/little-manager/badges/main/pipeline.svg)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=bugs)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=coverage)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=benmi_little-manager&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=benmi_little-manager)
My little project manager

## Starting the DB

```sh
# Start postgresql server docker image:
podman run --rm --name pg -p 5432:5432 \
   -e POSTGRES_PASSWORD=welcome \
   postgres:15

# (optional) To have a psql terminal on pg.
# In another terminal (tab) run psql:
podman exec -it -u postgres pg psql

# (optional) For pg to print all sql statements.
# In psql command line started above.
ALTER DATABASE postgres SET log_statement = 'all';
```

## Dev (watch)

> NOTE: Install cargo watch with `cargo install cargo-watch`.

```sh
# Terminal 1 - To run the server.
cargo watch -q -c -w crates/services/web-server/src/ -w crates/libs/ -w .cargo/ -x "run -p web-server"

# Terminal 2 - To run the quick_dev.
cargo watch -q -c -w crates/services/web-server/examples/ -x "run -p web-server --example quick_dev"
```

## Dev

```sh
# Terminal 1 - To run the server.
cargo run -p web-server

# Terminal 2 - To run the tests.
cargo run -p web-server --example quick_dev
```

## Unit Test (watch)

```sh
cargo watch -q -c -x "test -- --nocapture"

# Specific test with filter.
cargo watch -q -c -x "test -p lib-core test_create -- --nocapture"
```

## Unit Test

```sh
cargo test -- --nocapture

cargo watch -q -c -x "test -p lib-core model::task::tests::test_create -- --nocapture"
```

## Tools

```sh
cargo run -p gen-key
```

```sh
cargo run -p http-proxy
```

<br />

---

More resources for [Rust for Production Coding](https://rust10x.com)

[Starting point and insperation GitHub](https://github.com/rust10x/rust-web-app)
