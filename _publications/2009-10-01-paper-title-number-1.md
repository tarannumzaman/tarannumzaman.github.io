---
title: "SCMiner: localizing system-level concurrency faults from large system call traces"
collection: publications
permalink: /publication/2010-10-01-paper-title-number-1
excerpt:
date: 2019-11-11
venue: '34th IEEE/ACM International Conference on Automated Software Engineering (ASE)'
paperurl: 'https://ieeexplore.ieee.org/abstract/document/8952396'
citation: T. S. Zaman, X. Han and T. Yu, "SCMiner: Localizing System-Level Concurrency Faults from Large System Call Traces," 2019 34th IEEE/ACM International Conference on Automated Software Engineering (ASE), 2019, pp. 515-526, doi: 10.1109/ASE.2019.00055.
---

[Download paper here](https://par.nsf.gov/servlets/purl/10166153)

Abstract: Localizing concurrency faults that occur in production
is hard because, (1) detailed field data, such as user input,
file content and interleaving schedule, may not be available to
developers to reproduce the failure; (2) it is often impractical to
assume the availability of multiple failing executions to localize
the faults using existing techniques; (3) it is challenging to search
for buggy locations in an application given limited runtime data;
and, (4) concurrency failures at the system level often involve
multiple processes or event handlers (e.g., software signals), which
cannot be handled by existing tools for diagnosing intra-process
(thread-level) failures. To address these problems, we present
SCMiner, a practical online bug diagnosis tool to help developers
understand how a system-level concurrency fault happens based
on the logs collected by the default system audit tools. SCMiner
achieves online bug diagnosis to obviate the need for offline bug
reproduction. SCMiner does not require code instrumentation
on the production system or rely on the assumption of the
availability of multiple failing executions. Specifically, after the
system call traces are collected, SCMiner uses data mining and
statistical anomaly detection techniques to identify the failureinducing
system call sequences. It then maps each abnormal
sequence to specific application functions. We have conducted
an empirical study on 19 real-world benchmarks. The results
show that SCMiner is both effective and efficient at localizing
system-level concurrency faults.
